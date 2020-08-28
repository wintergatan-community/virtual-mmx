import { NoteSubdivision } from "../programmingWheelDisplay";
interface SubdivisionOptionProps {
    division: NoteSubdivision;
    icon: any;
    select: (division: NoteSubdivision) => void;
}
export declare const SubdivisionOption: (props: SubdivisionOptionProps) => JSX.Element;
export {};
