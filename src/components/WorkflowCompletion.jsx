import "./WorkflowCompletion.css";

export default function WorkflowCompletion({ title, message, actions }) {
  return <section className="workflow-completion" role="status"><i>✓</i><div><span>WORKFLOW COMPLETE</span><h3>{title}</h3><p>{message}</p></div><nav>{actions.map((action) => <button type="button" className={action.primary ? "primary" : ""} onClick={action.onClick} key={action.label}>{action.label}</button>)}</nav></section>;
}
