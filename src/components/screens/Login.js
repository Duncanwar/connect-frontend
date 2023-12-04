import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import auth from "../../services/authService";
import M from "materialize-css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email" });
      return;
    }
    // const { data } = await auth.login(email, password);
    // console.log(data);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "signin success" });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <h1 className="text-xl font-bold underline text-orange-700">
    Hello world!
  </h1>
  //   <div className="flex min-h-full flex-1 flex-cool justify-center px-6 py-12 lg:px-8">
  //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
  // Sign in to your account
  //     </h2>
  //     </div>
  //       <input className="px-12"
  //         type="text"
  //         placeholder="email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         />
  //       <input
  //         type="password"
  //         placeholder="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />

  //       <button
  //         className="btn waves-effect waves-light #64b5f6 blue lighten-2 "
  //         onClick={() => PostData()}
  //       >
  //         Login
  //       </button>
  //       <h5>
  //         <Link to="/signup">You don't have an account ?</Link>
  //       </h5>
  //       <h6>
  //         <Link to="/reset">Forgot Password </Link>
  //       </h6>
  //   </div>
//   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
//   <div className="sm:mx-auto sm:w-full sm:max-w-sm">

//     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//       Sign in to your account
//     </h2>
//   </div>

//   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//     <form className="space-y-6" action="#" method="POST">
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//           Email address
//         </label>
//         <div className="mt-2">
//           <input
//             id="email"
//             name="email"
//             type="email"
//             autoComplete="email"
//             required
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center justify-between">
//           <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//             Password
//           </label>
//           <div className="text-sm">
//             <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//               Forgot password?
//             </a>
//           </div>
//         </div>
//         <div className="mt-2">
//           <input
//             id="password"
//             name="password"
//             type="password"
//             autoComplete="current-password"
//             required
//             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//           />
//         </div>
//       </div>

//       <div>
//         <button
//           type="submit"
//           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Sign in
//         </button>
//       </div>
//     </form>

//     <p className="mt-10 text-center text-sm text-gray-500">
//       Not a member?{' '}
//       <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//         Start a 14 day free trial
//       </a>
//     </p>
//   </div>
// </div>
  );
};
export default Login;
