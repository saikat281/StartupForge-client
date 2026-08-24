import { CircleDollar, Gear, ShoppingBasket, TrashBin } from "@gravity-ui/icons";
import { Button, Card, Link } from "@heroui/react";

export function ManageOpportunityTable({ user }) {
    return (
        <div>
            {
                user?.map((data) => {
                    return (
                        <Card key={data?._id} className=" flex flex-row justify-between items-center w-[400px]">
                            <div>
                                <ShoppingBasket className="text-primary size-6" role="img"></ShoppingBasket>
                                <Card.Header>
                                    <Card.Title className="text-lg">{data?.roleTitle}</Card.Title>
                                    <Card.Description>
                                        {data?.skills}
                                    </Card.Description>
                                </Card.Header>
                                <Card.Footer>
                                    <Card.Description>
                                        {data?.workType}
                                    </Card.Description>
                                </Card.Footer>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button isIconOnly aria-label="Delete" variant="danger">
                                    <TrashBin />
                                </Button>

                                <Button isIconOnly aria-label="Settings" variant="secondary">
                                    <Gear />
                                </Button>
                            </div>

                        </Card>
                    )
                })
            }

        </div>

    );
}