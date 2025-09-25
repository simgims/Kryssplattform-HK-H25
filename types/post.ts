export interface PostComment {
	id: string;
	userName: string;
	text: string;
}

export interface PostData {
    id: string;
    title: string;
    description: string;
    imageUri: string;
    comments: PostComment[];
}

export interface PostComment {
    author: string;
    comment: string;
}