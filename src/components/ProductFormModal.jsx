import { useState, useEffect } from 'react';

const categories = ["Entradas", "Platos fuertes", "Bebidas", "Postres"];

function ProductFormModal({ isOpen, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: categories[0],
        extras: [],
        image: ""
    });

    const [newExtra, setNewExtra] = useState({
        name: "",
        price: ""
    });

    const [editingExtraIndex, setEditingExtraIndex] = useState(null);

    // Inicializar datos
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                category: initialData.category || categories[0],
                extras: initialData.extras ? [...initialData.extras] : [],
                image: initialData.image || ""
            });
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                category: categories[0],
                extras: [],
                image: ""
            });
        }
        setNewExtra({ name: "", price: "" });
        setEditingExtraIndex(null);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExtraFieldChange = (e) => {
        const { name, value } = e.target;
        setNewExtra({ ...newExtra, [name]: value });
    };

    const handleAddExtra = () => {
        if (newExtra.name.trim() && newExtra.price !== "") {
            const extraWithPrice = {
                name: newExtra.name.trim(),
                price: Number(newExtra.price)
            };

            if (editingExtraIndex !== null) {
                // Editar extra existente
                const updatedExtras = [...formData.extras];
                updatedExtras[editingExtraIndex] = extraWithPrice;
                setFormData({ ...formData, extras: updatedExtras });
                setEditingExtraIndex(null);
            } else {
                // Agregar nuevo extra
                setFormData({
                    ...formData,
                    extras: [...formData.extras, extraWithPrice]
                });
            }

            setNewExtra({ name: "", price: "" });
        }
    };

    const handleEditExtra = (index) => {
        const extraToEdit = formData.extras[index];
        setNewExtra({
            name: extraToEdit.name,
            price: extraToEdit.price.toString()
        });
        setEditingExtraIndex(index);
    };

    const handleRemoveExtra = (index) => {
        setFormData({
            ...formData,
            extras: formData.extras.filter((_, i) => i !== index)
        });
        if (editingExtraIndex === index) {
            setNewExtra({ name: "", price: "" });
            setEditingExtraIndex(null);
        }
    };

    const handleCancelEditExtra = () => {
        setNewExtra({ name: "", price: "" });
        setEditingExtraIndex(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            return alert("Nombre y precio son obligatorios");
        }

        onSubmit({
            ...formData,
            price: Number(formData.price)
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg md:text-xl font-bold mb-4">
                    {initialData ? "Editar Producto" : "Nuevo Producto"}
                </h3>

                <form onSubmit={handleSubmit}>
                    {/* Campo de imagen */}
                    <div className="mb-4">
                        <label className="block mb-2">Imagen del producto</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 text-sm md:text-base"
                        />
                        {formData.image && (
                            <div className="mt-2">
                                <img
                                    src={formData.image}
                                    alt="Vista previa"
                                    className="h-20 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>

                    {/* Grid responsive para campos principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nombre del producto */}
                        <div className="mb-4 md:col-span-2">
                            <label className="block mb-2">Nombre*</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                                required
                            />
                        </div>

                        {/* Precio */}
                        <div className="mb-4">
                            <label className="block mb-2">Precio*</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Categoría */}
                        <div className="mb-4">
                            <label className="block mb-2">Categoría</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded dark:bg-gray-700"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="mb-4">
                        <label className="block mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded dark:bg-gray-700"
                            rows="3"
                        />
                    </div>

                    {/* Sección de Extras - Responsive */}
                    <div className="mb-4">
                        <label className="block mb-2">Extras</label>
                        
                        {/* Inputs para extras */}
                        <div className="flex flex-col sm:flex-row gap-2 items-end mb-3">
                            <div className="flex-1 w-full">
                                <label className="block text-sm mb-1">Nombre del extra</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newExtra.name}
                                    onChange={handleExtraFieldChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700"
                                    placeholder="Ej: Queso extra"
                                />
                            </div>
                            <div className="w-full sm:w-24">
                                <label className="block text-sm mb-1">Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newExtra.price}
                                    onChange={handleExtraFieldChange}
                                    className="w-full p-2 border rounded dark:bg-gray-700"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div className="flex gap-1 w-full sm:w-auto">
                                {editingExtraIndex !== null ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleAddExtra}
                                            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                                            disabled={!newExtra.name || newExtra.price === ""}
                                        >
                                            ✓ Guardar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelEditExtra}
                                            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full sm:w-auto"
                                        >
                                            × Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleAddExtra}
                                        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                                        disabled={!newExtra.name || newExtra.price === ""}
                                    >
                                        + Agregar
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Lista de extras existentes */}
                        <div className="space-y-2">
                            {formData.extras.map((extra, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center px-3 py-2 rounded ${editingExtraIndex === index
                                        ? "bg-blue-100 dark:bg-blue-900/30" 
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                                >
                                    <div className="truncate">
                                        <span className="font-medium">{extra.name}</span>
                                        <span className="ml-2 text-green-600">+${extra.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleEditExtra(index)}
                                            className="text-blue-500 hover:text-blue-700 p-1"
                                            disabled={editingExtraIndex !== null && editingExtraIndex !== index}
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExtra(index)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            disabled={editingExtraIndex !== null}
                                            title="Eliminar"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de acción - Responsive */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition w-full sm:w-auto"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full sm:w-auto"
                        >
                            {initialData ? "Actualizar Producto" : "Guardar Producto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductFormModal;