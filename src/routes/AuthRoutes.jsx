import { StompSessionProvider } from "react-stomp-hooks";
import config from "../config/config";
import secureStorage from "../helper/secureStorage";
import { Outlet } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <StompSessionProvider
      url={`${config.baseUrl}${config.wsEndpoint}?token=${
        secureStorage.getItem("data").type
      } ${secureStorage.getItem("data").token}`}
      onConnect={() => console.log("Connected to WebSocket From App...")}
    >
      <Outlet />
    </StompSessionProvider>
  );
};

export default AuthRoutes;
