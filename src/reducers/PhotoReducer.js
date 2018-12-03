export const PHOTOS_REQUEST = "PHOTOS_REQUEST";
export const PHOTOS_ERROR = "PHOTOS_ERROR";
export const PHOTOS_SUCCESS = "PHOTOS_SUCCESS";
export const PHOTO_MODAL_SHOW = "PHOTO_MODAL_SHOW";
export const PHOTO_MODAL_HIDE = "PHOTO_MODAL_HIDE";
export const PHOTO_MODAL_NEXT = "PHOTO_MODAL_NEXT";


const initialState = {
    photos: null,
    photosLoading: false,
    photoInModal: null,
    modalShowed: false
};

export default function photos(state = initialState, action) {
    switch (action.type) {
        case 'PHOTOS_REQUEST':
            return {...state, photosLoading: true}
        case 'PHOTOS_ERROR':
            return {...state, photosLoading: false}
        case 'PHOTOS_SUCCESS':
            return  {...state, 
                photosLoading: false, 
                photos: action.payload
            }
        case 'PHOTO_MODAL_SHOW':
            return {...state, 
                modalShowed: true,
                photoInModal: action.payload
            }
        case 'PHOTO_MODAL_HIDE':
            return  {...state, 
                modalShowed: false,
                photoInModal: null
            }
        case 'PHOTO_MODAL_NEXT': 
            return {...state, 
                modalShowed: true,
                photoInModal: getPhotoByIndex(state.photos, action.payload)
            }
        default:
            return state
    }
}

function getPhotoByIndex(photos, index) {
    if(photos) {
        const nextPhoto = photos[index];
        if(nextPhoto) {
            return {...nextPhoto, dataIndex: index}
        } else {
            return {...photos[0], dataIndex: 0}
        }
    }
}