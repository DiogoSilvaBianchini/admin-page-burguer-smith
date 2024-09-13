import CircleGraph from "../circleGraph/CircleGraph"

const InfoMenu = () => {
  return (
    <div>
        <h2>Informações</h2>
        <CircleGraph progress={0} title="Favoritos"/>
        <CircleGraph progress={25} title="Pedidos"/>
        <CircleGraph progress={50} title="Entregas"/>
    </div>
  )
}

export default InfoMenu