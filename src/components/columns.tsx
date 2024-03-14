import Column from "./column";
import NewTodoDialog from "./newTodoDialog";

export default function Columns() {
  return (
    <div>
      <NewTodoDialog />
      <section className="mt-10 flex gap-6 lg:gap-12">
        <Column title="Todo" status="Todo" />
        <Column title="In Progress" status="Progress" />
        <Column title="Done" status="Done" />
      </section>
    </div>
  );
}
