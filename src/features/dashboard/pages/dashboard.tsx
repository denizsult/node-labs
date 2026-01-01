import { ScheduledTransfersSection, WorkingCapitalSection } from "../sections";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
      <div className=" lg:col-span-4 animate-fade-in delay-[400ms]">
        <WorkingCapitalSection />
      </div>

      <div className="col-span-1 lg:col-span-2 animate-fade-in delay-[600ms]">
        <ScheduledTransfersSection />
      </div>
    </div>
  );
};
