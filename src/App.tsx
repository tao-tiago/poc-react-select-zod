import ReactSelect from "react-select"
import { useForm, Controller } from "react-hook-form"
import { z as zod } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const handleSubmitRegisterSchema = zod.object({
  username: zod
    .string()
    .min(3, { message: "O e-mail deve conter no mínimo 3 caracteres" })
    .transform((email) => email.trim().toLocaleLowerCase()),

  preferenciaContato: zod
    .string()
    .nonempty({
      message: "campo preferenciaContato obrigatório"
    }),

  reactSelect: zod
    .object({
      value: zod.string().nonempty({ message: "selecione um valor no reactSelect" }),
      label: zod.string(),
    })
})

type IhandleSubmitRegister = zod.infer<typeof handleSubmitRegisterSchema>

function App() {

  const optionsPreferenceContact = [
    {
      value: "",
      label: "--Selecione um--"
    },
    {
      value: "WhatsApp",
      label: "WhatsApp"
    },
    {
      value: "E-mail",
      label: "E-mail"
    },
    {
      value: "Telefone",
      label: "Telefone"
    }
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      reactSelect: optionsPreferenceContact[0]
    }
  })

  const handleSubmitRegister = ({
    username,
    preferenciaContato,
    reactSelect
  }: IhandleSubmitRegister) => {
    console.log("username:", username)
    console.log("preferenciaContato:", preferenciaContato)
    console.log("reactSelect:", reactSelect.value)
  }

  const handleChange = (e: typeof optionsPreferenceContact[0]) => {
    console.log("Fez o 'change' do select: ",  e)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <div style={{
        width: '400px'
      }}>

        <form onSubmit={handleSubmit(handleSubmitRegister)}>
          <h3 className="title">Fields</h3>

          <div
            className="fieldsWrap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}
          >
            <div className="field">
              <input
                placeholder="E-mail"
                type="text"
                {...register("username")}
              />

              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>

            <div className="field">
              <select
                {...register("preferenciaContato")}
              >
                {optionsPreferenceContact.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {errors.preferenciaContato && (
                <p className="error">{errors.preferenciaContato.message}</p>
              )}
            </div>

            <div className="field">
              <Controller
                name="reactSelect"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <ReactSelect
                    name={name}
                    value={value}
                    closeMenuOnSelect={true}
                    isSearchable={true}
                    placeholder="Selecione um motivo"
                    noOptionsMessage={() => "Nenhum motivo para selecionar"}
                    onChange={(e) => {
                      if (e) {
                        handleChange(e)

                        onChange({
                          value: e.value,
                          label: e.label
                        })
                      }
                    }}
                    options={
                      optionsPreferenceContact.map((e) => ({
                        value: e.value,
                        label: e.label
                      }))
                    }
                  />
                )}
              />

              {errors.reactSelect && (
                <p className="error">
                  {errors.reactSelect.value?.message}
                </p>
              )}
            </div>

            <button type="submit">
              Entrar
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default App
