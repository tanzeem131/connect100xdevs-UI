import { FaBroadcastTower } from "react-icons/fa";

export const WorkStatusCard = ({
  status,
  CardComponent,
  variants,
  padding = "p-6",
}) => (
  <CardComponent
    padding={padding}
    className="md:col-span-1 lg:col-span-2 group bg-gradient-to-br from-teal-900/80 to-neutral-900"
    variants={variants}
  >
    <div className="flex items-center gap-4">
      <div className="relative">
        <FaBroadcastTower size={32} className="text-teal-400" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping"></div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">Status</h2>
        <p className="text-teal-300">{status}</p>
      </div>
    </div>
  </CardComponent>
);
