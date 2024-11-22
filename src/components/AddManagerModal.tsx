import { useEffect, useState } from "react";
import { addManager } from "../services/users.service";

interface AddManagerModalProps {
    showAddModal: boolean;
    setShowAddModal: (show: boolean) => void;
    setReload: (reload: boolean) => void;
}

const AddManagerModal = ({
    showAddModal,
    setShowAddModal,
    setReload,
}: AddManagerModalProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to reset form fields
    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setBirthDate("");
        setEmail("");
        setPassword("");
    };

    useEffect(() => {
        const modal = document.getElementById(
            "add_manager_modal"
        ) as HTMLDialogElement;
        if (modal) {
            if (showAddModal) {
                modal.showModal();
            } else {
                resetForm(); // Reset fields before closing
                modal.close();
            }
        }
    }, [showAddModal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            birthDate,
            email,
            password,
        };

        try {
            const response = await addManager(userData); // Call the addManager function
            if (response) {
                setReload(true);
                setShowAddModal(false);
            }
        } catch (error) {
            console.error("Error adding manager:", error); // Handle the error as needed
        }
    };

    return (
        <dialog id="add_manager_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setShowAddModal(false)}
                    >
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Add New Manager</h3>
                <form className="py-4 flex flex-col" onSubmit={handleSubmit}>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="input input-bordered w-full rounded-md"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="input input-bordered w-full rounded-md"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Birth Date</span>
                        </div>
                        <input
                            type="date"
                            className="input input-bordered w-full rounded-md"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-amber-600 px-4 py-2 text-base text-white hover:bg-amber-700 transition mt-4"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default AddManagerModal;
