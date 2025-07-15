"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Video, MessageCircle, Package, Star, MapPin, GraduationCap, CreditCard, Check } from "lucide-react";
import Link from "next/link";
import { format, addDays, setHours, setMinutes, isAfter, isBefore, parseISO } from "date-fns";

// Sample counselor data - in real app, this would come from API
const counselorsData = [
  {
    id: "counselor-001",
    name: "Dr. Amina Ibrahim",
    image: "/images/counselors/amina.jpg",
    title: "International Education Specialist",
    rating: 4.9,
    reviewCount: 124,
    experience: "8+ years",
    location: "Lagos, Nigeria",
    specialties: ["South Africa Universities", "Ghana Universities", "Medical Programs", "Scholarship Applications"],
    countries: ["South Africa", "Ghana", "Rwanda"],
    languages: ["English", "Hausa", "Arabic"],
    bio: "Dr. Ibrahim has successfully guided over 500 Nigerian students to secure admissions at top African universities.",
    price: {
      video: 15000,
      chat: 8000,
      package: 50000
    },
    availability: {
      timezone: "WAT",
      workingHours: { start: 9, end: 17 },
      unavailableDates: ["2024-01-15", "2024-01-22"],
      bookedSlots: ["2024-01-16T10:00", "2024-01-16T14:00", "2024-01-17T11:00"]
    }
  },
  {
    id: "counselor-002",
    name: "Michael Okonkwo",
    image: "/images/counselors/michael.jpg",
    title: "Engineering Education Consultant",
    rating: 4.8,
    reviewCount: 98,
    experience: "6+ years",
    location: "Abuja, Nigeria",
    specialties: ["Engineering Programs", "Rwanda Universities", "STEM Fields", "Technology Programs"],
    countries: ["Rwanda", "Ghana", "South Africa"],
    languages: ["English", "Igbo"],
    bio: "Michael has extensive experience in engineering education consulting and STEM program placements.",
    price: {
      video: 12000,
      chat: 7000,
      package: 45000
    },
    availability: {
      timezone: "WAT",
      workingHours: { start: 10, end: 18 },
      unavailableDates: ["2024-01-18", "2024-01-25"],
      bookedSlots: ["2024-01-17T12:00", "2024-01-17T15:00", "2024-01-18T10:00"]
    }
  },
  {
    id: "counselor-003",
    name: "Grace Adeyemi",
    image: "/images/counselors/grace.jpg",
    title: "Scholarship & Financial Aid Expert",
    rating: 4.7,
    reviewCount: 113,
    experience: "5+ years",
    location: "Ibadan, Nigeria",
    specialties: ["Scholarship Applications", "Financial Aid", "Business Programs", "Study Abroad Funding"],
    countries: ["Ghana", "South Africa", "Rwanda"],
    languages: ["English", "Yoruba"],
    bio: "Grace specializes in scholarship and financial aid consulting with over $2M in scholarships secured.",
    price: {
      video: 13000,
      chat: 8000,
      package: 48000
    },
    availability: {
      timezone: "WAT",
      workingHours: { start: 9, end: 16 },
      unavailableDates: ["2024-01-20", "2024-01-27"],
      bookedSlots: ["2024-01-16T11:00", "2024-01-19T14:00", "2024-01-19T15:30"]
    }
  },
  {
    id: "counselor-004",
    name: "Dr. Joseph Mwangi",
    image: "/images/counselors/joseph.jpg",
    title: "Academic Planning Specialist",
    rating: 4.6,
    reviewCount: 89,
    experience: "7+ years",
    location: "Kigali, Rwanda",
    specialties: ["Academic Planning", "Graduate Programs", "Research Opportunities", "PhD Applications"],
    countries: ["Rwanda", "South Africa", "Ghana"],
    languages: ["English", "Kinyarwanda", "French"],
    bio: "Dr. Mwangi is an academic planning specialist with focus on graduate-level programs and research opportunities.",
    price: {
      video: 16000,
      chat: 9000,
      package: 55000
    },
    availability: {
      timezone: "CAT",
      workingHours: { start: 8, end: 17 },
      unavailableDates: ["2024-01-23", "2024-01-30"],
      bookedSlots: ["2024-01-16T09:00", "2024-01-17T13:00", "2024-01-18T11:30"]
    }
  }
];

const consultationTypes = [
  {
    id: "video",
    name: "Video Call",
    icon: Video,
    duration: 45,
    description: "Face-to-face consultation via video call",
    features: ["Screen sharing", "Recording available", "Document sharing"]
  },
  {
    id: "chat",
    name: "Chat Session",
    icon: MessageCircle,
    duration: 60,
    description: "Text-based consultation with instant responses",
    features: ["Real-time messaging", "File sharing", "Chat history"]
  },
  {
    id: "package",
    name: "Comprehensive Package",
    icon: Package,
    duration: 120,
    description: "Complete guidance package with follow-ups",
    features: ["Multiple sessions", "Application review", "Follow-up support", "Priority support"]
  }
];

export default function BookConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const counselorId = params.counselorId as string;

  const [counselor, setCounselor] = useState(() => {
    return counselorsData.find(c => c.id === counselorId) || counselorsData[0];
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("video");
  const [notes, setNotes] = useState<string>("");
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);

  // Generate available time slots
  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const { start, end } = counselor.availability.workingHours;

    for (let hour = start; hour < end; hour++) {
      for (const minute of [0, 30]) {
        const slotTime = setMinutes(setHours(date, hour), minute);
        const slotString = format(slotTime, "yyyy-MM-dd'T'HH:mm");

        // Check if slot is already booked
        const isBooked = counselor.availability.bookedSlots.includes(slotString);

        // Check if slot is in the past
        const isPast = isBefore(slotTime, new Date());

        if (!isBooked && !isPast) {
          slots.push({
            time: slotString,
            display: format(slotTime, "h:mm a"),
            available: true
          });
        }
      }
    }

    return slots;
  };

  const selectedConsultationType = consultationTypes.find(type => type.id === selectedType);
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];
  const selectedPrice = counselor.price[selectedType as keyof typeof counselor.price];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedType) return;

    setIsBooking(true);

    // Redirect to payment page with booking details
    const bookingParams = new URLSearchParams({
      type: selectedType,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      notes: notes || ""
    });

    router.push(`/counseling/payment/${counselorId}?${bookingParams.toString()}`);
  };

  if (bookingComplete) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-8">
          <Card>
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your consultation with {counselor.name} has been successfully booked.
              </p>
              <div className="space-y-2 text-sm mb-6">
                <p><strong>Date:</strong> {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                <p><strong>Time:</strong> {selectedTime && format(parseISO(selectedTime), "h:mm a")}</p>
                <p><strong>Type:</strong> {selectedConsultationType?.name}</p>
                <p><strong>Duration:</strong> {selectedConsultationType?.duration} minutes</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => router.push('/counseling')} variant="outline">
                  Back to Counselors
                </Button>
                <Button onClick={() => router.push('/profile')}>
                  View My Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/counseling">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Counselors
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Book Consultation</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Counselor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={counselor.image} alt={counselor.name} />
                    <AvatarFallback>
                      {counselor.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-1">{counselor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{counselor.title}</p>

                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-sm font-medium">
                      {counselor.rating} ({counselor.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {counselor.location}
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                    {counselor.experience} experience
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {counselor.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <p className="text-sm text-muted-foreground">
                    {counselor.languages.join(", ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consultation Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Select Consultation Type
                </CardTitle>
                <CardDescription>
                  Choose the type of consultation that best fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultationTypes.map((type) => {
                  const Icon = type.icon;
                  const price = counselor.price[type.id as keyof typeof counselor.price];
                  const isSelected = selectedType === type.id;

                  return (
                    <div
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-5 w-5 mt-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div>
                            <h4 className="font-medium">{type.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {type.features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatPrice(price)}</div>
                          <div className="text-xs text-muted-foreground">{type.duration} min</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Select Date
                </CardTitle>
                <CardDescription>
                  Choose a date for your consultation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const dateString = format(date, "yyyy-MM-dd");
                    return date < new Date() || counselor.availability.unavailableDates.includes(dateString);
                  }}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time Selection */}
            {selectedDate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Select Time
                  </CardTitle>
                  <CardDescription>
                    Available time slots for {format(selectedDate, "EEEE, MMMM d")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {timeSlots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={selectedTime === slot.time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(slot.time)}
                          className="text-sm"
                        >
                          {slot.display}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No available time slots for this date.</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>
                  Share any specific topics or questions you'd like to discuss (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Tell the counselor about your educational goals, specific universities you're interested in, or any questions you have..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Booking Summary & Payment */}
            {selectedDate && selectedTime && selectedType && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Counselor</p>
                      <p className="font-medium">{counselor.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{selectedConsultationType?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{format(selectedDate, "EEEE, MMM d, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">{format(parseISO(selectedTime), "h:mm a")} WAT</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{selectedConsultationType?.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Cost</p>
                      <p className="font-semibold text-lg">{formatPrice(selectedPrice)}</p>
                    </div>
                  </div>

                  <Separator />

                  <Button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    size="lg"
                  >
                    {isBooking ? "Proceeding..." : `Proceed to Payment - ${formatPrice(selectedPrice)}`}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By booking, you agree to our terms of service and cancellation policy.
                    You can reschedule up to 24 hours before your appointment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
