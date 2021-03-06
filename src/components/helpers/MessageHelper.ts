import emails from "../../data/email.json";
import { TagType, IEmailModel } from "../../interfaces/interface";

export const stripHtml = (html: string) => {
  var tmp = document.createElement("P");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const getEmailById = (emailList: IEmailModel[], id: any) => {
  const email = emailList.find((x) => x.id === id);
  return email;
};

export const getLabelsById = (emailList: IEmailModel[], id: any) => {
  const tags = emailList.find((x) => x.id === id);
  return tags?.tags;
};

export const getMessagesByTag = (tagId: TagType) => {
  if (tagId === TagType.travel) {
    return emails.messages.filter((a) => a.tags.includes("travel"));
  } else if (tagId === TagType.work) {
    return emails.messages.filter((a) => a.tags.includes("work"));
  }

  return emails.messages;
};

export const getMessagesByTagFromArray = (
  emailList: IEmailModel[],
  tagId: TagType
) => {
  if (tagId === TagType.travel) {
    return emailList.filter((a) => a.tags.includes("travel"));
  } else if (tagId === TagType.work) {
    return emailList.filter((a) => a.tags.includes("work"));
  }

  return emailList;
};

// helper memthod to remove all items from store
export const removeDeletedItems = (
  state: IEmailModel[],
  array: IEmailModel[]
) => {
  for (let i = 0; i < array.length; i++) {
    removeItem(state, array[i].id);
  }

  return state;
};

// helper method to remove item from store
export const removeItem = (array: IEmailModel[], item: string) => {
  var removeIndex = array
    .map(function (item) {
      return item.id;
    })
    .indexOf(item);

  if (removeIndex !== -1) {
    array.splice(removeIndex, 1);
  }
};

// array to store the messages to delete
export const deleteArray: IEmailModel[] = [];
