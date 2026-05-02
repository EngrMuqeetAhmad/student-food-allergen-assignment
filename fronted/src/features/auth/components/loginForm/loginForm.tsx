import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../authApi";
import { useAppDispatch } from "../../../../store/hooks";
import { onLogin } from "../../authSlice";
import { useNavigate } from "react-router";
import { routes } from "../../../../routes/routes";


type LoginFormInputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const useDispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [login, { isLoading }] = useLoginMutation();
    

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const res = await login(data).unwrap();
            console.log("Login success:", res);
            useDispatch(onLogin({
                user: res.user,
                token: res.token
            }))

            navigate(routes.menu)

        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[300px]">

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required",
                })}
                className="border p-2"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                    },
                })}
                className="border p-2"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white p-2">
                {isLoading ? "Logging in..." : "Login"}
            </button>

        </form>
    );
};