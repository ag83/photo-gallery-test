import {
	PHOTOS_REQUEST,
	PHOTOS_ERROR,
	PHOTOS_SUCCESS,
	PHOTO_MODAL_SHOW,
	PHOTO_MODAL_HIDE,
	PHOTO_MODAL_NEXT
} from "../reducers/photoReducer";


export function showPhotoModal(photo) {
	return {
        type: PHOTO_MODAL_SHOW,
        payload: photo
	};
}

export function hidePhotoModal() {
	return {
		type: PHOTO_MODAL_HIDE,
	};
}

export function nextPhotoModal(index) {
	return {
		type: PHOTO_MODAL_NEXT,
		payload: index
	};
}

function photosSuccess(photos) {
	return {
        type: PHOTOS_SUCCESS,
        payload: photos
	};
}


export function getPhotos() {
	return (dispatch) => {

		dispatch({type: PHOTOS_REQUEST});
		fetch(
			"https://jsonplaceholder.typicode.com/photos",
			{
				method: "GET",
				crossDomain: true,
			}
		)
			.then((response) => response.json())
			.then((res) => {
				dispatch(photosSuccess(res));
			})
			.catch((err) => dispatch({type: PHOTOS_ERROR}));
	};
}