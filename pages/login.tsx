import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InputAdornment from "@material-ui/core/InputAdornment";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="p-10">
      <form>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="you@domain.com"
          className="transition-all duration-200 border-5"
        />
      </form>
    </div>
  );
};

export default LoginPage;
