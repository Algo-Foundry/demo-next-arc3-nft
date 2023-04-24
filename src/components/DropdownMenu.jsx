import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useWallet } from "@txnlab/use-wallet";
import Button from "./Button";

export default function DropdownMenu() {
    const { providers, activeAccount } = useWallet();

    return (
        <div className="w-56 text-right top-16">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="bg-teal-700 text-white rounded-md p-2 hover:text-white focus:outline-none focus:text-white focus:bg-teal-600">
                        Connect Wallet
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items 
                        className="absolute right-0 w-max mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        static={true}
                    >
                        {providers?.map((provider) => (
                            <div key={provider.metadata.id} className="px-1 py-1">
                                <Menu.Item
                                    disabled={true}
                                >
                                    {({ close }) => (
                                        <div
                                            key={"provider-" + provider.metadata.id}
                                            className="flex items-center p-4 px-6 h-24"
                                        >
                                            <div className="flex-1 flex items-center h-15">
                                                <div className="sm:mr-4 flex-initial">
                                                    <div className="sm:mb-2">
                                                        <img
                                                            className="inline-block sm:mr-1"
                                                            width={30}
                                                            height={30}
                                                            alt=""
                                                            src={provider.metadata.icon}
                                                        />
                                                        {provider.metadata.name}
                                                    </div>
                                                    {provider.isActive && provider.accounts.length && (
                                                        <select
                                                            value={activeAccount?.address}
                                                            onChange={(e) => {
                                                                provider.setActiveAccount(e.target.value);
                                                            }}
                                                        >
                                                            {provider.accounts.map((account) => (
                                                                <option key={account.address} value={account.address}>
                                                                    {account.address}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mr-4 flex-initial">
                                                {provider.isConnected && !provider.isActive && (
                                                    <Button
                                                        label="Set Active"
                                                        onClick={provider.setActiveProvider}
                                                        disabled={!provider.isConnected || provider.isActive}
                                                    />
                                                )}
                                            </div>
                                            <div className="mr-4 flex-initial">
                                                {provider.isConnected ? (
                                                    <Button
                                                        label="Disconnect"
                                                        onClick={provider.disconnect}
                                                        disabled={!provider.isConnected}
                                                    />
                                                ) : (
                                                    <Button
                                                        label="Connect"
                                                        onClick={provider.connect}
                                                        disabled={provider.isConnected}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
