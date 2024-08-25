import { useEffect, useState } from "react";
import Template from "../../Components/Template/Template";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = cookies.get("Access-Token");
    if (token) {
      setIsLogin(true);
      navigate("/account"); // Redirect to AccountPage if logged in
    }
  }, [navigate]);

  return (
    <div>
      {isLogin ? (
        <p>Redirecting to your account...</p> // Optional: Display a message during redirect
      ) : (
        <Template Formtype="login" />
      )}
    </div>
  );
};

export default LoginPage;
