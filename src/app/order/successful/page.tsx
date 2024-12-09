"use client";
import { FixedCartItem } from "@/app/cart/components/FixedCartItem";
import Stepper from "@keyvaluesystems/react-stepper";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

function getIndexOfStepper(status: string): number {
    switch (status) {
        case "INPROGRESS":
            return 0;
        case "PROCESSING":
            return 1;
        case "CONFIRMED":
            return 2;
        case "DISPATCHED":
            return 3;
        case "DELIVERED":
            return 4;
        case "CANCELLED":
            return 5;
            default: 
            return -1;
    }
}

export default function SuccessfulOrder() {
    const searchParams = useSearchParams();
    const [response, setResponse] = useState<any>('');
    useEffect(() => {
        fetch("https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/orders/get-order/" + searchParams.get("id"), {
            method: "GET"
        }).then((r) => r.json()).then((r) => {
            setResponse(r);
        })
    }, [
        searchParams.get("id")
    ]);
    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <div className="flex items-end gap-2">
            <h1 className="text-2xl">Order Successful</h1>
            <p className="text-lg opacity-30 font-medium">#{response.orderId?.split("-")[0]}</p>
            </div>
            <div className="flex gap-8 my-8 items-start w-full">
            <Stepper
                steps={[
                    {
                        stepLabel: "INPROGRESS",
                        stepDescription: new Date(response.orderDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                        completed: getIndexOfStepper(response.status) >=0 ,
                    },
                    {
                        stepLabel: "PROCESSING",
                        stepDescription: new Date(response.lastUpdatedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                        completed: getIndexOfStepper(response.status) >=1,
                    },
                    {
                        stepLabel: "CONFIRMED",
                        stepDescription: new Date(response.lastUpdatedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                        completed: getIndexOfStepper(response.status) >=2,
                    },
                    {
                        stepLabel: "DISPATCHED",
                        stepDescription: new Date(response.lastUpdatedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                        completed: getIndexOfStepper(response.status) >=3,
                    },
                    {
                        stepLabel: "DELIVERED",
                        stepDescription: new Date(response.lastUpdatedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
                        completed: getIndexOfStepper(response.status) >=4,
                    },
                    // {
                    //     stepLabel: "CANCELLED",
                    //     stepDescription: "This is Step 3",
                    //     completed: getIndexOfStepper(response.status) >=0,
                    // },
                ]}
                currentStepIndex={getIndexOfStepper(response.status)}
                // showDescriptionsForAllSteps = {true}
            />
            <div className="w-full">
            <div className="flex flex-row gap-8 grow">
                <div className="shrink-0 grow border-x px-6">
                <p className="mb-8 text-xl">Products</p>
                {
                    
                    response.items?.map((item: any) => {
                        return (<FixedCartItem
                            productId={item.productId}
                            key={item.productId}
                            price={item.price}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            variantName={item.variantName}
                            variant={item.variant}
                            category={item.category}
                            quantity={item.quantity}
                            discount={item.discount}
                        />);
                    })
                }
                </div>
                <div className="w-56">
                    <p>{response.paymentId}</p>
                    <p>{response.deliveryDate}</p>
                    <p>{response.orderDate}</p>
                    <p>{response.couponCode}</p>
                    <p>{response.discount}</p>
                    <p>{response.discountType}</p>
                    <p>{JSON.stringify(response.additionalInfo)}</p>
                    <p>{JSON.stringify(response.payment)}</p>
                </div>
                
            </div>
            </div>
            </div>
            {/* orderId, userId, items, status, paymentId, deliveryAddress, deliveryDate, orderDate, couponCode, discount, discountType, additionalInfo */}
        </div>
    );
}