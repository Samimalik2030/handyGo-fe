import { Box ,Image} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate()
  return (
    <>
      <Box w={125}>
        <Image
        style={{
            cursor:"pointer",
            
        }}
        onClick={()=>navigate('/')}
          src={
            "https://ik.imagekit.io/yzrrrgg3d/final-lg-removebg-preview%20(1).png?updatedAt=1742788255533"
          }
        />
      </Box>
    </>
  );
}
