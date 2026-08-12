"use client";

import { pageTransition } from "@/lib/motion/page";
import { AnimatePresence, motion } from "framer-motion";
import PurchaseContent from "./layout/PurchaseContent";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PurchaseHeader from "./layout/PurchaseHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  purchaseWizardSchema,
  PurchaseWizardValues,
} from "@/lib/validation/purchase-wizard-schema";

import PurchaseStepper from "./stepper/PurchaseStepper";

import BuyerInformationForm from "./forms/BuyerInformationForm";
import AddressForm from "./forms/AddressForm";
import RequestInformationForm from "./forms/RequestInformationForm";
import PurchaseReview from "./stepper/PurchaseReview";

import { defaultPurchaseWizardData } from "@/lib/purchase/purchase-defaults";
import { useState } from "react";

import { getPurchaseItems } from "@/lib/purchase/purchase-storage";
import { getPurchaseSummary } from "@/lib/purchase/purchase-summary";

import type { PurchaseItem } from "@/types/purchase";
import PurchaseSummary from "./summary/PurchaseSummary";

export default function PurchaseWizard()   {


 const [currentStep, setCurrentStep] = useState(0);
 
const [purchaseItems] = useState<PurchaseItem[]>(() => getPurchaseItems());
console.log("Purchase Items:", purchaseItems);
const summary = getPurchaseSummary(purchaseItems);


const methods = useForm<PurchaseWizardValues>({
  resolver: zodResolver(purchaseWizardSchema),

  defaultValues: defaultPurchaseWizardData,

  mode: "onTouched",
});



const stepComponents = [
  <BuyerInformationForm
    key="buyer"
    onNext={() => {
      console.log("BUYER → ADDRESS");
      setCurrentStep(1);
    }}
  />,

  <AddressForm
    key="address"
    onNext={() => {
      console.log("ADDRESS → REQUEST");
      setCurrentStep(2);
    }}
  />,

  <RequestInformationForm
    key="request"
    onNext={() => {
      console.log("REQUEST → REVIEW");
      setCurrentStep(3);
    }}
  />,

  <PurchaseReview
    key="review"
  />,
];


  return (
  <FormProvider {...methods}>
    <div className="space-y-10">

<PurchaseHeader />
    <PurchaseStepper currentStep={currentStep} />

<PurchaseContent
  summary={
  <PurchaseSummary
    productCount={summary.productCount}
    totalQuantity={summary.totalQuantity}
    estimatedTotal={summary.estimatedTotal}
     hasPriceOnRequest={summary.hasPriceOnRequest}
    footer={
      <p className="text-sm text-stone-500">
        Harga akhir akan dikonfirmasi oleh tim kami.
      </p>
    }
  />
}
>


 <CardContent className="p-8">
  <AnimatePresence mode="wait">
    <motion.div
  key={currentStep}
  {...pageTransition}
>
      {stepComponents[currentStep]}
    </motion.div>
  </AnimatePresence>
</CardContent>
</PurchaseContent>

      <div className="mt-8 flex justify-between">
       <Button
  type="button"
  variant="outline"
  onClick={() =>
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }
  disabled={currentStep === 0}
>
  Kembali
</Button>
      </div>

    </div>
  </FormProvider>
);
}