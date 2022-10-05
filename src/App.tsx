 import { Formik, Field, Form, ErrorMessage, FormikState } from 'formik';
 import * as Yup from 'yup';

interface IItialValues {
  firstName: string, message: string, colors: string
}

 const SignupForm: React.FC<{}> = () => {
  let formikValues: IItialValues= { firstName: '', message: '', colors: 'red' }
   return (
     <Formik
       initialValues={formikValues}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
           message: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
          colors: Yup.string().oneOf(['red', 'green', 'blue'], 'Opção invalida').required('Required'),
       })}
       onSubmit={(values, { setSubmitting, resetForm }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
         resetForm(formikValues as Partial<FormikState<IItialValues>>) //Reset Form
       }}
     >
      {({handleChange, setFieldValue}) => (
        <Form>
        <label aria-required htmlFor="firstName">First Name</label>
        <Field name="firstName" placeholder="Jane" />
        {/*name: nome da variavel onde o valor do field vai ser armazenado*/}
        <ErrorMessage name="firstName" />

        <label aria-required htmlFor="message">Last Name</label>
        <Field
         name="message"
       >
        {({ field, form: { isSubmitting } }: {field: Record<string, undefined>, form:{isSubmitting: boolean}}) => (
           <input id="message" {...field} onChange={(event) => {
            handleChange(event)
            setFieldValue('colors', 'blue') 
          }} disabled={isSubmitting} placeholder="lastName" />
         )}
       </Field>
        <ErrorMessage name="message">{msg => <div>potato {msg}</div>}</ErrorMessage>
       {/*Dessa forma podemos aplicar estilização nos componentes*/}
        <label htmlFor="colors">Email Address</label>
        <Field name="colors" as="select" >
         <option value="red">Red</option>
         <option value="green">Green</option>
         <option value="blue">Blue</option>
         <option value="pato">Pato</option> {/*Exemplo de erro apontado pelo yup*/}
       </Field>
        <ErrorMessage name="colors" />

        <button type="submit">Submit</button>
      </Form>
       )}
     </Formik>
      
   );
 };

 export default SignupForm