import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const navigate = useNavigate();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`/task/${task.id}`);
  };

  return (
    <a
      href={`/task/${task.id}`}
      onClick={handleNavigate}
      draggable
      onDragStart={handleDragStart}
      className="block mb-3 cursor-move hover:border-primary transition-colors"
    >
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        </CardHeader>
      </Card>
    </a>
  );
}
