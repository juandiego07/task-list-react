import "./App.css";
import { nanoid } from "nanoid";
import React from "react";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [listaTareas, setListaTareas] = React.useState([]);

  const [editar, setEditar] = React.useState(false);
  const [id, setId] = React.useState("");

  const handleInput = (e) => {
    // console.log(e.target.value)
    setTarea(e.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Debe ingresar una tarea");
      return;
    }
    setListaTareas([
      ...listaTareas,
      {
        id: nanoid(),
        tarea: tarea,
      },
    ]);

    setTarea("");
  };

  const handlerEliminar = (id) => {
    console.log(id);

    const arregloTemporal = listaTareas.filter((elemento) => {
      return elemento.id !== id;
      // return !(elemento.id === id)
    });
    setListaTareas(arregloTemporal);
  };

  const handlerEditar = (task) => {
    // console.log(task);
    setTarea(task.tarea);
    setEditar(true)
    setId(task.id)
  };

  const handleGuardarEditar = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Debe ingresar una tarea");
      return;
    }
    const arregloTemporal = listaTareas.map((item) => {
      return item.id === id ? { id: id, tarea: tarea } : item;
    });
    setListaTareas(arregloTemporal);
    setTarea("");
    setEditar(false)
  };

  return (
    <div className="container mt-5">
      <h1>Lista de tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tareas</h4>
          <ul className="list-group">
            {listaTareas.map((task) => (
              <li className="list-group-item" key={task.id}>
                <span className="lead">{task.tarea}</span>

                <button
                  className="btn btn-outline-danger btn-sm float-end mx-2"
                  onClick={() => handlerEliminar(task.id)}
                >
                  Borrar
                </button>

                <button
                  className="btn btn-outline-warning btn-sm float-end"
                  onClick={() => handlerEditar(task)}
                >
                  Modificar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">
            {editar ? "Editar tarea" : "Crear tarea"}
          </h4>
          <form
            className="d-grid"
            onSubmit={editar ? handleGuardarEditar : handleForm}
          >
            <input
              type="text"
              className="form-control mb-2"
              onChange={handleInput}
              placeholder="Ingresa la tarea"
              value={tarea}
            />
            {editar ? (
              <button className="btn btn-outline-warning">Editar</button>
            ) : (
              <button className="btn btn-outline-success">Adicionar</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
