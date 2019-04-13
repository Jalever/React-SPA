import {
	DETERMINE_ITEM
} from "./../actions/actionTypes.jsx";


let initialState = {
	cell: "",
	dob: {
		date: "",
		age: 0
	},
	email: "",
	gender: "",
	id: {
		name: "",
		value: ""
	},
	location: {
		street: "",
		city: "",
		state: "",
		postcode: 0,
		coordinates: {}
	},
	login: {},
	name: {},
	nat: "",
	phone: "",
	picture: {},
	registered: {}
};


export default function(state = initialState, action) {
	switch(action.type) {
		case DETERMINE_ITEM: {
			let { item } = action.payload;
			return item;
		}
		default: 
			return state;
	}
}