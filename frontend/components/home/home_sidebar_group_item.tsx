import React from "react";
import { Group } from "../../types/types";

const HomeSidebarGroupItem = ({ group }: {group: Group}) => {
  return (
    <div>
      {group.title}
    </div>
  )
}

export default HomeSidebarGroupItem