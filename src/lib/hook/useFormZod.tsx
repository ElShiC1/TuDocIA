"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"


export const useFormZod = <T extends z.ZodObject>(schema: T) => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    setValue
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    mode: "all",
  });

  return { success, setSuccess, register, handleSubmit, formState, setValue };
};