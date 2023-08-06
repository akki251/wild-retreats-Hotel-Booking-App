import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import useLogout from "../features/authentication/useLogout";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, isHacked } = useUser();
  useEffect(() => {
    if (isLoading === false && isAuthenticated === false) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isHacked) {
    secureLocalStorage.clear();
    throw new Error(
      "Warning, Your account has been compromised, Please update your password"
    );
  }
  if (isAuthenticated) return children; // this is important
};

export default ProtectedRoute;
