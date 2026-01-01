import {
  ChipIcon,
  MasterCardIcon,
  NftIcon,
  VisaIcon,
} from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";

export const ScheduledTransfersCardStack = () => {
  return (
    <div className="relative w-full h-[359px]">
      <div className="w-full h-[247px]">
        <h2 className="font-semibold text-lg text-colortext-1 p-0">Wallet</h2>

        {/* Main card - dark gradient */}
        <Card className="mt-2 w-[354px] h-[210px] rounded-2xl bg-gradient-to-br from-[#4a4a49] to-[#20201f] border-none">
          <CardContent className="p-0 h-full">
            
            <div className="flex items-center justify-between px-8 pt-5 pb-2">
              <div className="flex items-center gap-[90px] w-full">
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex items-center gap-2">
                    <span className="font-normal text-white">Fintech.</span>
                    <div className="w-px h-5 bg-gray-600" />
                    <span className="font-medium text-gray-500 text-xs">
                      Universal Bank
                    </span>
                  </div>

                  <div className="flex justify-between w-full">
                    <ChipIcon className="w-10 h-8" />
                    <NftIcon className="w-9 h-9" />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 flex flex-col gap-2">
              <div className="font-bold text-white text-lg tracking-widest">
                5495&nbsp;&nbsp;7381&nbsp;&nbsp;3759&nbsp;&nbsp;2321
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-400 text-sm">04/24</div>
                <MasterCardIcon className="w-12 h-9" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Second card - glassmorphism effect */}
        <Card className="absolute top-[190px] left-4 w-[324px] h-[172px] rounded-2xl bg-transparent border-none shadow-none overflow-hidden">
          <CardContent className="relative p-0 h-full">
            {/* Background gradient layer */}
            <div
              className="absolute inset-0 rounded-2xl opacity-10"
              style={{
                background:
                  "linear-gradient(131deg, #959595 -12%, #324000 148%)",
                pointerEvents: "none",
              }}
            />

            {/* Glass effect layer */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/30"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                pointerEvents: "none",
              }}
            />

            <VisaIcon className="absolute w-8 h-5 bottom-6 right-6" />

            <div className="absolute top-4 left-5 flex flex-col gap-6 w-full">
              <div className="flex items-center gap-[69px]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-normal text-white">Fintech.</span>
                    <div className="w-px h-5 bg-gray-100" />
                    <span className="font-medium text-gray-100 text-xs">
                      Commercial Bank
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <ChipIcon className="w-8 h-6" />
                    <NftIcon className="absolute right-10 w-9 h-9" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="font-bold text-[#1b212d] tracking-wide">
                  85952548****
                </div>
                <div className="font-medium text-[#929eae] text-xs tracking-wider">
                  09/25
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
