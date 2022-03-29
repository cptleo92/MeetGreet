import { Group } from "../types/types";

// type organizers = {
//   [id: number]: {
//     fname: string;
//     lname: string;
//   }
// }

export const getOrganizers = (group: Group) => {
  return $.ajax({
    method: "GET",
    url: "api/memberships",
    data: {id: group.id}
  })
}