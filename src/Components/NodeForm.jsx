import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

function NodeForm({ clickedNode, submitHandler, fields, setClickedNode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    fields.forEach((field) => {
      if (field.name.includes(".")) {
        let nestedNames = field.name.split(".");
        let value = clickedNode;
        nestedNames.forEach((key) => {
          value = value[key];
        });
        setValue(field.name, value);
      } else {
        setValue(field.name, clickedNode[field.name]);
      }
    });
  }, [clickedNode, setValue]);

  const onSubmit = (data) => submitHandler(data, clickedNode.id);

  return (
    <div className="bg-black h-full p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-start"
      >
        {fields.map((property) => (
          <Input
            key={property.name}
            label={property.label}
            type={property.type}
            register={register}
            name={property.name}
            errors={errors}
          />
        ))}
        <div className="flex flex-row justify-between">
          <Button
            label="Close"
            handleClick={() => {
              setClickedNode(null);
            }}
          />
          <Button label="Save" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default NodeForm;
