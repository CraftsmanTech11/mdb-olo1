const initialState = {
  isLoading: true,
  minLoading: false,
  isError: false,
  data: null,
  AllRestaurantDishes: [],
  status: 200,
  statusText: "",
  Strloclatitude: "",
  strLocLongitude: "",
  errorMsg: "",
  AllLocations: [],
  allCities: [],
  homeDetails: {},
  formatedAdd: {},
  restList: { RestaurantDeliveryList: [], StatusCode: 0 },
  menuDetails: { MenuHeadList: [], MenuItemList: [], MenuItemModifierList: [] },
  IntLocRestaurantId: 642420
};
const userState = {
  location: {
    Strloclatitude: "",
    strLocLongitude: ""
  },
  status: 200,
  statusText: "",
  errorMsg: "",
  userLoading: false,
  minLoading: false,
  isError: false
};

export const restListReducer = (state = initialState, action) => {
  const { type, payload, shortType } = action;
  switch (type) {
    case `${shortType}_LOADING`:
      return { ...state, ...payload, isLoading: true };
    case `${shortType}_SUCCESS`:
      return { ...state, ...payload, isLoading: false };
    case `${shortType}_FAILURE`:
      return { ...state, ...payload, isLoading: false, isError: true };
    case `${shortType}_MIN_LOADING`:
      return { ...state, ...payload, minLoading: true };
    case `${shortType}_MIN_SUCCESS`:
      return { ...state, ...payload, minLoading: false };
    case `${shortType}_MIN_FAILURE`:
      return { ...state, ...payload, minLoading: false, isError: true };
    default:
      return state;
  }
};

export const userReducer = (state = userState, action) => {
  const { type, payload, shortType } = action;
  switch (type) {
    case `${shortType}_USER_LOADING`:
      return { ...state, ...payload, userLoading: true };
    case `${shortType}_USER_SUCCESS`:
      return { ...state, ...payload, userLoading: false };
    case `${shortType}_USER_FAILURE`:
      return { ...state, ...payload, userLoading: false, isError: true };
    case `${shortType}_USER_MIN_LOADING`:
      return { ...state, ...payload, minLoading: true };
    case `${shortType}_USER_MIN_SUCCESS`:
      return { ...state, ...payload, minLoading: false };
    case `${shortType}_USER_MIN_FAILURE`:
      return { ...state, ...payload, minLoading: false, isError: true };
    default:
      return state;
  }
};
