import { IUser } from "@/interface";

  const usersData: IUser[] = [
  {
    id: "a6f91863-a416-49a2-bf03-7021a7ae994d",
    name: "John",
    email: "johndoe1234@gmail.com",
    linkedinURL: "johndoe",
    gender: "Male",
    address: {
      line1: "123 Main St",
      line2: "Apt 4B",
      state: "Haryana",
      city: "Faridabad",
      pin: "900010",
    },
    active: true,
  },
  {
    id: "01e05b4d-9b86-4c69-8704-cdf8593359e4",
    name: "Jane Smith",
    email: "janesmith5678@gmail.com",
    linkedinURL: "janesmith",
    gender: "Female",
    address: {
      line1: "456 Elm St",
      line2: "Suite 7C",
      state: "Gujarat",
      city: "Ahmedabad",
      pin: "100011",
    },
    active: true,
  },
  {
    id: "3ddc0e4c-900d-4714-a64b-4fe6ecff2205",
    name: "jayasree",
    email: "jsree1234@gmail.com",
    linkedinURL: "jjj",
    gender: "Female",
    address: {
      line1: "line2",
      line2: "lin23",
      state: "tamil nadu",
      city: "chennai",
      pin: "6060210",
    },
    active: true,
  },
];
export default usersData