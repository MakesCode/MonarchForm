import MonarchForm, { StepConfig, StepProps } from "../../MonarchForm";


type Form1Data = { firstname: string };
type Form2Data = { periode: boolean };
type Form3Data = { details: string };
type CompleteFormData = {
  form1?: Form1Data;
  form2?: Form2Data;
  form3?: Form3Data;
};

export const FormReact = () => {
  const steps: Array<StepConfig<Form1Data | Form2Data | Form3Data, CompleteFormData>> = [
    { name: 'form1', component: Form1, shouldRender: () => true },
    { name: 'form2', component: Form2, shouldRender: () => true },
    {
      name: 'form3',
      component: Form3,
      shouldRender: (formData: CompleteFormData) => formData.form2?.periode === true,
    },
  ];

  const handleSubmit = (formData: CompleteFormData, clearFilters: () => void) => {
    console.log('Données finales :', formData);
    alert('Formulaire soumis avec succès !');
    clearFilters();
  };

  return (
    <MonarchForm steps={steps} nameStorage="myForm2" onSubmitApi={handleSubmit}>
      {({ currentForm, prevStep, progress, isLastStep, currentStepIndex, id }) => (
        <div>
          <div>
            Étape {currentStepIndex + 1} / {steps.length}
            <p>Progression : {progress.toFixed(0)}%</p>
          </div>
          <div>{currentForm}</div>
          <div>
            {currentStepIndex > 0 && <button onClick={prevStep}>Précédent</button>}
            <button type="submit" form={id}>
              {isLastStep ? 'Soumettre' : 'Suivant'}
            </button>
          </div>
        </div>
      )}
    </MonarchForm>
  );
};
const Form1 = ({ onDataChange, data, id, onTempChange  }: StepProps<Form1Data>) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstname = formData.get('firstname') as string;
    onDataChange({ firstname });
  };
  return (
    <form onSubmit={handleSubmit} id={id}>
      <label htmlFor="firstname">Prénom :</label>
      <input
        id="firstname"
        name="firstname"
        defaultValue={data.firstname}
      />
    </form>
  );
};

const Form2 = ({ onDataChange, data, id, onTempChange }: StepProps<Form2Data>) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const periode = formData.get('periode') === 'on';
    onDataChange({ periode });
  };
  return (
    <form onSubmit={handleSubmit} id={id}>
      <label htmlFor="periode">Période active :</label>
      <input
        type="checkbox"
        id="periode"
        name="periode"
        defaultChecked={data.periode}
        onChange={(e) => onTempChange?.({ periode: e.target.checked })}
      />
    </form>
  );
};

const Form3 = ({ onDataChange, data, id, onTempChange  }: StepProps<Form3Data>) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const details = formData.get('details') as string;
    onDataChange({ details });
  };
  return (
    <form onSubmit={handleSubmit} id={id}>
      <label htmlFor="details">Détails :</label>
      <input
        id="details"
        name="details"
        defaultValue={data.details}
      />
    </form>
  );
};