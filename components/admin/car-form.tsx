"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Car } from "@/lib/types"
import { addCar, updateCar, uploadImage } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"
import { X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"

interface CarFormProps {
  car?: Car | null
  onClose: () => void
  onSave: (car: Car) => void
}

export function CarForm({ car, onClose, onSave }: CarFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    description: "",
    location: "",
    vin: "",
    contact: {
      phone: "",
      whatsapp: "",
    },
  })
  const [images, setImages] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (car) {
      setFormData({
        title: car.title,
        make: car.make,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        price: car.price,
        description: car.description,
        location: car.location,
        vin: car.vin || "",
        contact: car.contact,
      })
      setImages(car.images)
    }
  }, [car])

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const carData = {
        ...formData,
        images,
        rating: car?.rating || 0,
        reviews: car?.reviews || [],
        approved: car?.approved || false,
        listedAt: car?.listedAt || new Date(),
      }

      let savedCar: Car
      if (car) {
        savedCar = await updateCar(car.id, carData)
      } else {
        savedCar = await addCar(carData)
      }

      onSave(savedCar)
      toast({
        title: "Success",
        description: `Car ${car ? "updated" : "added"} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${car ? "update" : "add"} car`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{car ? "Edit Car" : "Add New Car"}</CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="vin">VIN (Optional)</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.contact.whatsapp}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, whatsapp: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            {/* Image URLs */}
            <div>
              <Label>Car Images (URLs)</Label>
              <p className="text-sm text-gray-600 mb-2">
                Add image URLs from Cloudinary or other image hosting services. Each URL should be on a separate line.
              </p>
              <Textarea
                placeholder="https://res.cloudinary.com/doifsytuh/image/upload/cars/honda-civic-2021/front.jpg
https://res.cloudinary.com/doifsytuh/image/upload/cars/honda-civic-2021/side.jpg
https://res.cloudinary.com/doifsytuh/image/upload/cars/honda-civic-2021/interior.jpg"
                value={images.join('\n')}
                onChange={(e) => setImages(e.target.value.split('\n').filter(url => url.trim()))}
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Tip: Upload your photos to Cloudinary first, then copy the URLs here
              </p>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Car image ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-600 hover:bg-red-700"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700">
                {saving ? "Saving..." : car ? "Update Car" : "Add Car"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
