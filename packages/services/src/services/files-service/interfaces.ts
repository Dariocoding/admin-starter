export interface UploadImageResponse {
	secureUrl: string;
}

export interface UploadImageParams {
	type: 'full' | 'streamline';
	mode: 'dark' | 'light';
}
