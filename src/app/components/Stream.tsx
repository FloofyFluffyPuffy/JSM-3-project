import { useParams } from "react-router-dom";
import StreamContent from "./StreamContent";
import GetStream from "./GetStream";
const Stream = () => {
  const { href }: { href?: string } = useParams();
  // wrap it in {} to destructure it from Params bcuz it
  // return object like {href: ...} (hrefStuff)
  // have to : in {} too cuz it an object
  return (
    <div>
      <GetStream href={href} />
      <StreamContent />
    </div>
  );
};
export default Stream;
