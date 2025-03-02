import { createFileRoute } from "@tanstack/react-router"
import React from "react";
import MonarchForm, { StepConfig, StepProps } from "../MonarchForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <></>
  )
}
