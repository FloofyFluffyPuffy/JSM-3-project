import React from "react";
import { useParams } from "react-router-dom";
interface Props {
  href?: string;
}
const GetStream = ({ href }: { href?: string }) => {
    // have to : in {} too cuz it an object
    const API_URL = import.meta.env.VITE_API_URL;
  return (
    <div>
      {href}
    </div> /*(hrefStuff) otherwise i cant use it here even with {} bcuz it a hook/function  */
  );
};

export default GetStream;
