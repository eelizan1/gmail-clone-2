import { createStore, combineReducers } from "redux";
import { AnyAction } from "redux";
import { IEmailModel } from "../interfaces/interface";

/** This is the shared resource (Store) so other parts of the application can use and manipulate
 * inbox data,

/* Normally, seperations of concerns and abstraction of code into other folders
will take place given larger amounts of actions and reducers for multple components */

// action types for the email list
export const storeList = (emails: IEmailModel[]) => ({
  type: "store_list",
  payload: { emails },
});

export const deleteFromList = (emails: IEmailModel[]) => ({
  type: "delete_list",
  payload: { emails },
});

// reducer to switch between inbox types
const counterReducer = (state = { count: 1 }, action: { type: any }) => {
  switch (action.type) {
    case "inbox":
      return {
        ...state,
        count: state.count = 1,
      };
    case "travel":
      return {
        ...state,
        count: state.count = 2,
      };
    case "work":
      return {
        ...state,
        count: state.count = 3,
      };
    default:
      return state;
  }
};

// initial inbox list reducer state
const initialListState: IEmailModel[] = [];
// inbox list reducer methods
export const inboxListReducer = (
  state = initialListState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case "store_list":
      return payload.emails;
    case "delete_list":
      state = removeDeletedItems(state, payload.emails);
      return state;
    default:
      return state;
  }
};

// helper memthod to remove all items from store
const removeDeletedItems = (state: IEmailModel[], array: IEmailModel[]) => {
  for (let i = 0; i < array.length; i++) {
    removeItem(state, array[i].id);
  }

  return state;
};

// helper method to remove item from store
const removeItem = (array: IEmailModel[], item: string) => {
  var removeIndex = array
    .map(function (item) {
      return item.id;
    })
    .indexOf(item);

  if (removeIndex !== -1) {
    array.splice(removeIndex, 1);
  }
};

// initial state
const INITIAL_STATE = {};

// store - if multiple reducer then combine
const rootReducer = combineReducers({
  counterReducer,
  inboxListReducer,
});
export const store = createStore(rootReducer, INITIAL_STATE);
