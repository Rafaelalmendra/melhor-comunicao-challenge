import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import '../../styles/global.scss'
import './style.scss'

//Validações do formulário.
const validationCreate = yup.object({
  model: yup.string()
  .required("Campo obrigatório")
  .max(255, "Deve conter no máximo 255 caracteres")
  .min(2, "Deve conter no mínimo 2 caracteres"),

  brand: yup.string()
  .strict(true)
  .trim('Não pode haver espaçamentos')
  .required("Campo obrigatório")
  .max(255, "Deve conter no máximo 255 caracteres")
  .min(2, "Deve conter no mínimo 2 caracteres"),

  price: yup.number()
  .positive("O Número deve ser positivo.")
  .typeError("Este campo é obrigatório!")
  .required(),

  startDate: yup.date()
  .min("2018/12/25", "A data de início deve ser posterior ao dia 25/12/2018.")
  .typeError("Este campo é obrigatório!")
  .required(),

  endDate: yup.date("Campo obrigatório")
  .min(yup.ref('startDate'),"A data de fim deve ser posterior a data de início.")
  .typeError("Este campo é obrigatório!")
  .required(),

  code: yup.string("Campo obrigatório")
  .max(8, "O código deve conter 8 caracteres")
  .min(8, "O código deve conter 8 caracteres")
  .required()
});

export function Create() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationCreate)
  })

  const onSubmit = data => console.log(data)

  return (
    <>
      <main>
        <div className="card-detail">
          <h2>Detalhe do produto</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="fields">
              <div className="field-body">
                <label>Modelo</label>
                <input
                  type="text" 
                  placeholder="XT2041-1"
                  name="model"
                  {...register("model")} 
                />
                <p className="error-message">{errors.model?.message}</p>
              </div>

              <div className="field-body">
                <label>Marca</label>
                <input 
                  type="text" 
                  placeholder="Motorola"
                  name="brand"
                  {...register("brand")}
                />
                <p className="error-message">{errors.brand?.message}</p>
              </div>
            </div>

            <div className="fields">
              <div className="field-body">
                <label>Cor</label>
                <select
                  name="color"
                  {...register("color")}
                >
                  <option value="BLACK">Preto</option>
                  <option value="WHITE">Branco</option>
                  <option value="GOLD">Dourado</option>
                  <option value="PINK">Rosa</option>
                </select>
              </div>

              <div className="field-body">
                <label>Preço</label>
                <input
                  type="number"
                  placeholder="1.400,00"
                  name="price"
                  {...register("price")}
                />
                <p className="error-message">{errors.price?.message}</p>
              </div>
            </div>

            <div className="fields">
              <div className="field-body">
                <label>Inicio das vendas</label>
                <input 
                  type="date"
                  name="startDate"
                  minValue="2018-02-15"
                  {...register("startDate")}
                />
                <p className="error-message">{errors.startDate?.message}</p>
              </div>

              <div className="field-body">
                <label>Fim das vendas</label>
                <input 
                  type="date" 
                  name="endDate"
                  {...register("endDate")}
                />
                <p className="error-message">{errors.endDate?.message}</p>
              </div>
            </div>

            <div className="fields">
              <div className="field-body">
                <label>Código de identificação</label>
                <input
                  type="text"
                  placeholder="23856234"
                  name="code"
                  {...register("code")}
                />
                <p className="error-message">{errors.code?.message}</p>
              </div>
            </div>

            <div className="button-field">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="button-create">Voltar</button>
              </Link>
              <button className="button-create" type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}