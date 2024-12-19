import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
  });

  useEffect(() => {
    const pageTitle = "Carrer Hub | Forget Password";
    document.title = pageTitle;
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      setFormData({ email: "", password: "" });
      navigate("/");
      toast.success("User logged in successfully!");
    } catch (error) {
      toast.error(error.message);
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            onClick={() => window.open("https://gmail.com","_blank")}
            className="w-full px-4 py-2 text-lg font-medium text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
        </form>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;