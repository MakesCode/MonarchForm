import { z } from "zod";
import MonarchForm, { StepConfig, StepProps } from "../../MonarchForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const basicInfoSchema = z.object({
  fullName: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("L'email est invalide"),
  phone: z.string().regex(/^\d{10}$/, "Le numéro doit contenir 10 chiffres"),
});
const basicInfoSchema2 = z.object({
  fullName: z.string().min(1, "Le nom complet est requis"),
});
const eventPreferencesSchema = z.object({
  attendanceType: z.enum(["inPerson", "virtual"], {
    required_error: "Le type de participation est requis",
  }),
  session: z.string().min(1, "Veuillez sélectionner une session"),
});

const confirmationSchema = z.object({
  newsletter: z.boolean(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "Vous devez accepter les conditions"),
});
type CompleteFormData = {
  basicInfo?: z.infer<typeof basicInfoSchema>;
  eventPreferences?: z.infer<typeof eventPreferencesSchema>;
  confirmation?: z.infer<typeof confirmationSchema>;
  basicInfo2?: z.infer<typeof basicInfoSchema2>;
};


export const BasicInfoForm = ({
  onDataChange,
  data,
  id,
}: StepProps<z.infer<typeof basicInfoSchema>>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: z.infer<typeof basicInfoSchema>) => {
    onDataChange(formData);
  };

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="fullName">Nom complet</label>
        <input {...register("fullName")} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="phone">Numéro de téléphone</label>
        <input type="tel" {...register("phone")} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
    </form>
  );
};
export const EventPreferencesForm = ({
  onDataChange,
  data,
  id,
}: StepProps<z.infer<typeof eventPreferencesSchema>>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventPreferencesSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: z.infer<typeof eventPreferencesSchema>) => {
    onDataChange(formData);
  };

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Type de participation</label>
        <select {...register("attendanceType")}>
          <option value="">Sélectionnez une option</option>
          <option value="inPerson">En personne</option>
          <option value="virtual">Virtuel</option>
        </select>
        {errors.attendanceType && <p>{errors.attendanceType.message}</p>}
      </div>
      <div>
        <label htmlFor="session">Session</label>
        <input {...register("session")} />
        {errors.session && <p>{errors.session.message}</p>}
      </div>
    </form>
  );
};
export const ConfirmationForm = ({
  onDataChange,
  data,
  id,
  onTempChange,
}: StepProps<z.infer<typeof confirmationSchema>>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(confirmationSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: z.infer<typeof confirmationSchema>) => {
    onDataChange(formData);
  };
  const handleTempChange = (field: string, value: boolean) => {
    onTempChange?.({ [field]: value });
  };
  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input type="checkbox" {...register("newsletter")} 
          onChange={(e) => handleTempChange("newsletter", e.target.checked)}
          />
          S'inscrire à la newsletter
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" {...register("agreeToTerms")} 
          
          />
          Accepter les conditions
        </label>
        {errors.agreeToTerms && <p>{errors.agreeToTerms.message}</p>}
      </div>
    </form>
  );
};
export const BasicInfoForm2 = ({
  onDataChange,
  data,
  id,
}: StepProps<z.infer<typeof basicInfoSchema2>>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema2),
    defaultValues: data,
  });

  const onSubmit = (formData: z.infer<typeof basicInfoSchema2>) => {
    onDataChange(formData);
  };

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="fullName">Nom complet 2</label>
        <input {...register("fullName")} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>
    </form>
  );
};
const steps: Array<
  StepConfig<
    | z.infer<typeof basicInfoSchema>
    | z.infer<typeof eventPreferencesSchema>
    | z.infer<typeof confirmationSchema>
    | z.infer<typeof basicInfoSchema2>,
    CompleteFormData
  >
> = [
  { name: "basicInfo", component: BasicInfoForm, shouldRender: () => true },
  {
    name: "confirmation",
    component: ConfirmationForm,
    shouldRender: () => true,
  },
  {
    name: "eventPreferences",
    component: EventPreferencesForm,
    shouldRender: (data) => data.confirmation?.newsletter === true,
  },
  {
    name: "basicInfo2",
    component: BasicInfoForm2,
    shouldRender: (data) => true,
  },
];
export const ReactHookForm = () => {
  const handleSubmit = (
    formData: CompleteFormData,
    clearFilters: () => void
  ) => {
    console.log("Données soumises :", formData);
    alert("Inscription réussie !");
    clearFilters();
  };
  return (
    <MonarchForm
    steps={steps}
    nameStorage="eventRegistration"
    onSubmitApi={handleSubmit}
  >
    {({
      currentForm,
      prevStep,
      progress,
      isLastStep,
      currentStepIndex,
      id,
    }) => (
      <div>
        <div>
          <h2>Étape {currentStepIndex + 1} / {steps.length}</h2>
          <p>Progression : {progress.toFixed(0)}%</p>
        </div>
        <div>{currentForm}</div>
        <div>
          {currentStepIndex > 0 && (
            <button onClick={prevStep}>Précédent</button>
          )}
          <button type="submit" form={id}>
            {isLastStep ? "Confirmer" : "Suivant"}
          </button>
        </div>
      </div>
    )}
  </MonarchForm>
  )
}
