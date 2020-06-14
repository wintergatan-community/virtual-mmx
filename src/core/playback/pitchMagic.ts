// Slightly modified from https://stackoverflow.com/questions/57222269/how-to-pitchshift-an-audio-buffer-in-tone-js

const MAX_FRAME_LENGTH = 16000;
const gInFIFO = new Array(MAX_FRAME_LENGTH).fill(0.0);
const gOutFIFO = new Array(MAX_FRAME_LENGTH).fill(0.0);
const gFFTworksp = new Array(2 * MAX_FRAME_LENGTH).fill(0.0);
const gLastPhase = new Array(MAX_FRAME_LENGTH / 2 + 1).fill(0.0);
const gSumPhase = new Array(MAX_FRAME_LENGTH / 2 + 1).fill(0.0);
const gOutputAccum = new Array(2 * MAX_FRAME_LENGTH).fill(0.0);
const gAnaFreq = new Array(MAX_FRAME_LENGTH).fill(0.0);
const gAnaMagn = new Array(MAX_FRAME_LENGTH).fill(0.0);
const gSynFreq = new Array(MAX_FRAME_LENGTH).fill(0.0);
const gSynMagn = new Array(MAX_FRAME_LENGTH).fill(0.0);
let gRover = 0;
// var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

function loadTheTrack(file: File, shiftAmount: number) {
	var reader = new FileReader();
	reader.onload = function () {
		// console.log("decoding audio data with" + this.result);
		audioCtx.decodeAudioData(
			this.result as ArrayBuffer,
			(decodedData: AudioBuffer) => {
				var in_data_l = decodedData.getChannelData(0);
				// console.log(in_data_l);
				var in_data_r = decodedData.getChannelData(1);
				// console.log(in_data_r);
				in_data_l = PitchShift(
					shiftAmount,
					in_data_l.length,
					1024,
					10,
					audioCtx.sampleRate,
					in_data_l
				);
				// console.log(in_data_l);
				in_data_r = PitchShift(
					shiftAmount,
					in_data_l.length,
					1024,
					10,
					audioCtx.sampleRate,
					in_data_r
				);
				decodedData.copyToChannel(in_data_l, 0);
				decodedData.copyToChannel(in_data_r, 1);
				var source = audioCtx.createBufferSource(); // creates a sound source
				source.buffer = decodedData; // tell the source which sound to play
				source.connect(audioCtx.destination); // connect the source to the context's destination (the speakers)
				// console.log("starting");
				source.start(0); // play the source now
			}
		);
	};
	reader.readAsArrayBuffer(file);
}

export function PitchShift(
	/* float[*/ pitchShift: number,
	/* long */ numSampsToProcess: number,
	/* long */ fftFrameSize: number,
	/* long */ osamp: number,
	/* float[*/ sampleRate: number,
	/* float[] */ indata: Float32Array
) {
	/* double */ var magn, phase, tmp, window, real, imag;
	/* double */ var freqPerBin, expct;
	/* long */ var i, k, qpd, index, inFifoLatency, stepSize, fftFrameSize2;

	/* float[] */ var outdata = indata;
	/* set up some handy variables */
	fftFrameSize2 = Math.trunc(fftFrameSize / 2);
	stepSize = Math.trunc(fftFrameSize / osamp);
	freqPerBin = sampleRate / /* (double) */ fftFrameSize;
	expct =
		(2.0 * Math.PI * /* (double) */ stepSize) / /* (double) */ fftFrameSize;
	inFifoLatency = Math.trunc(fftFrameSize - stepSize);
	if (gRover == 0) gRover = inFifoLatency;

	/* main processing loop */
	for (i = 0; i < numSampsToProcess; i++) {
		/* As long as we have not yet collected enough data just read in */
		gInFIFO[gRover] = indata[i];
		outdata[i] = gOutFIFO[gRover - inFifoLatency];
		gRover++;

		/* now we have enough data for processing */
		if (gRover >= fftFrameSize) {
			gRover = inFifoLatency;

			/* do windowing and re,im interleave */
			for (k = 0; k < fftFrameSize; k++) {
				window =
					-0.5 *
						Math.cos(
							(2.0 * Math.PI * /* (double) */ k) / /* (double) */ fftFrameSize
						) +
					0.5;
				gFFTworksp[2 * k] = /* (float) */ gInFIFO[k] * window;
				gFFTworksp[2 * k + 1] = 0.0;
			}

			/* ***************** ANALYSIS ******************* */
			/* do transform */
			ShortTimeFourierTransform(gFFTworksp, fftFrameSize, -1);

			/* this is the analysis step */
			for (k = 0; k <= fftFrameSize2; k++) {
				/* de-interlace FFT buffer */
				real = gFFTworksp[2 * k];
				imag = gFFTworksp[2 * k + 1];

				/* compute magnitude and phase */
				magn = 2.0 * Math.sqrt(real * real + imag * imag);
				phase = Math.atan2(imag, real);

				/* compute phase difference */
				tmp = phase - gLastPhase[k];
				gLastPhase[k] = /* (float) */ phase;

				/* subtract expected phase difference */
				tmp -= /* (double) */ k * expct;

				/* map delta phase into +/- Pi interval */
				qpd = /* (long) */ Math.trunc(tmp / Math.PI);
				if (qpd >= 0) qpd += qpd & 1;
				else qpd -= qpd & 1;
				tmp -= Math.PI * /* (double) */ qpd;

				/* get deviation from bin frequency from the +/- Pi interval */
				tmp = (osamp * tmp) / (2.0 * Math.PI);

				/* compute the k-th partials' true frequency */
				tmp = /* (double) */ k * freqPerBin + tmp * freqPerBin;

				/* store magnitude and true frequency in analysis arrays */
				gAnaMagn[k] = /* (float) */ magn;
				gAnaFreq[k] = /* (float) */ tmp;
			}

			/* ***************** PROCESSING ******************* */
			/* this does the actual pitch shifting */
			for (var zero = 0; zero < fftFrameSize; zero++) {
				gSynMagn[zero] = 0;
				gSynFreq[zero] = 0;
			}

			for (k = 0; k <= fftFrameSize2; k++) {
				index = /* (long) */ Math.trunc(k * pitchShift);
				if (index <= fftFrameSize2) {
					gSynMagn[index] += gAnaMagn[k];
					gSynFreq[index] = gAnaFreq[k] * pitchShift;
				}
			}

			/* ***************** SYNTHESIS ******************* */
			/* this is the synthesis step */
			for (k = 0; k <= fftFrameSize2; k++) {
				/* get magnitude and true frequency from synthesis arrays */
				magn = gSynMagn[k];
				tmp = gSynFreq[k];

				/* subtract bin mid frequency */
				tmp -= /* (double) */ k * freqPerBin;

				/* get bin deviation from freq deviation */
				tmp /= freqPerBin;

				/* take osamp into account */
				tmp = (2.0 * Math.PI * tmp) / osamp;

				/* add the overlap phase advance back in */
				tmp += /* (double) */ k * expct;

				/* accumulate delta phase to get bin phase */
				gSumPhase[k] += /* (float) */ tmp;
				phase = gSumPhase[k];

				/* get real and imag part and re-interleave */
				gFFTworksp[2 * k] = /* (float) */ magn * Math.cos(phase);
				gFFTworksp[2 * k + 1] = /* (float) */ magn * Math.sin(phase);
			}

			/* zero negative frequencies */
			for (k = fftFrameSize + 2; k < 2 * fftFrameSize; k++) gFFTworksp[k] = 0.0;

			/* do inverse transform */
			ShortTimeFourierTransform(gFFTworksp, fftFrameSize, 1);

			/* do windowing and add to output accumulator */
			for (k = 0; k < fftFrameSize; k++) {
				window =
					-0.5 *
						Math.cos(
							(2.0 * Math.PI * /* (double) */ k) / /* (double) */ fftFrameSize
						) +
					0.5;
				gOutputAccum[k] +=
					/* (float) */ (2.0 * window * gFFTworksp[2 * k]) /
					(fftFrameSize2 * osamp);
			}
			for (k = 0; k < stepSize; k++) gOutFIFO[k] = gOutputAccum[k];

			/* shift accumulator */
			//memmove(gOutputAccum, gOutputAccum + stepSize, fftFrameSize * sizeof(float));
			for (k = 0; k < fftFrameSize; k++) {
				gOutputAccum[k] = gOutputAccum[k + stepSize];
			}

			/* move input FIFO */
			for (k = 0; k < inFifoLatency; k++) gInFIFO[k] = gInFIFO[k + stepSize];
		}
	}
	return outdata;
}

function ShortTimeFourierTransform(
	/* float[] */ fftBuffer: number[],
	/* long */ fftFrameSize: number,
	/* long */ sign: number
) {
	/* float */ var wr, wi, arg, temp;
	/* float */ var tr, ti, ur, ui;
	/* long */ var i, bitm, j, le, le2, k;

	for (i = 2; i < 2 * fftFrameSize - 2; i += 2) {
		for (bitm = 2, j = 0; bitm < 2 * fftFrameSize; bitm <<= 1) {
			if ((i & bitm) != 0) j++;
			j <<= 1;
		}
		if (i < j) {
			temp = fftBuffer[i];
			fftBuffer[i] = fftBuffer[j];
			fftBuffer[j] = temp;
			temp = fftBuffer[i + 1];
			fftBuffer[i + 1] = fftBuffer[j + 1];
			fftBuffer[j + 1] = temp;
		}
	}
	/* long */ var max = /* (long) */ Math.trunc(
		Math.log(fftFrameSize) / Math.log(2.0) + 0.5
	);
	for (k = 0, le = 2; k < max; k++) {
		le <<= 1;
		le2 = le >> 1;
		ur = 1.0;
		ui = 0.0;
		arg = /* (float) */ Math.PI / (le2 >> 1);
		wr = /* (float) */ Math.cos(arg);
		wi = /* (float) */ sign * Math.sin(arg);
		for (j = 0; j < le2; j += 2) {
			for (i = j; i < 2 * fftFrameSize; i += le) {
				tr = fftBuffer[i + le2] * ur - fftBuffer[i + le2 + 1] * ui;
				ti = fftBuffer[i + le2] * ui + fftBuffer[i + le2 + 1] * ur;
				fftBuffer[i + le2] = fftBuffer[i] - tr;
				fftBuffer[i + le2 + 1] = fftBuffer[i + 1] - ti;
				fftBuffer[i] += tr;
				fftBuffer[i + 1] += ti;
			}
			tr = ur * wr - ui * wi;
			ui = ur * wi + ui * wr;
			ur = tr;
		}
	}
}
