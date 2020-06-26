// https://webpack.js.org/guides/typescript/#importing-other-assets
declare module "*.png" {
	const content: any;
	export default content;
}
declare module "*.jpg" {
	const content: any;
	export default content;
}
declare module "*.gif" {
	const content: any;
	export default content;
}
