import { Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  stepCircleMotion,
  checkMotion,
  connectorMotion,
  labelMotion,
} from "@/lib/motion/stepper";

type PurchaseStepperProps = {
  currentStep: number;
};

const steps = [
  "Pembeli",
  "Alamat",
  "Permintaan",
  "Review",
];

export default function PurchaseStepper({
  currentStep,
}: PurchaseStepperProps) {
  return (
    <div className="mb-10 flex items-center justify-between">
      {steps.map((step, index) => {
        const active = index <= currentStep;
        const completed = index < currentStep;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: active ? 1 : 0.92,
                }}
                transition={stepCircleMotion.transition}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  active
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-stone-300 bg-white text-stone-400"
                }`}
              >
                {completed ? (
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -90,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Check
                      size={18}
                      strokeWidth={3}
                    />
                  </motion.div>
                ) : (
                  index + 1
                )}
              </motion.div>

              <motion.span
                animate={{
                  opacity: active ? 1 : 0.6,
                  y: active ? 0 : 2,
                }}
                transition={checkMotion.transition}
                className={`mt-2 text-sm ${
                  active
                    ? "font-semibold text-stone-900"
                    : "text-stone-500"
                }`}
              >
                {step}
              </motion.span>
            </div>

            {index < steps.length - 1 && (
              <div className="relative mx-4 h-0.5 flex-1 overflow-hidden rounded bg-stone-200">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded bg-amber-700"
                  initial={false}
                  animate={{
                    width: completed ? "100%" : "0%",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}