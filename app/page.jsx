import Faqs from "@/components/faqs";
import TestimonialCarousel from "@/components/testimonial-carousel";
import Cta from "@/components/cta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BarChart2, Book, Calendar, ChevronRight, FileText, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { getDailyPrompt } from "@/actions/public";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default async function Home() {
  const dailyPrompt = await getDailyPrompt();
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold md:text-7xl lg:8xl mb-6 gradient-title">
          Reveal your thoughts, ideas and feelings.
        </h1>
        <p className="text-lg font-semibold text-gray-500 md:text-xl mb-8">
          Capture your thoughts, track your mood and reveal your true self in a beautiful and secure space.
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent/50 rounded-2xl pointer-events-none z-10"/>
          <div className="bg-white rounded-2xl p-4 max-full-mx-auto">
            <div className="border-b border-blue-100 pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-900" />
                <span className="text-blue-900 font-medium">Today&rsquo;s Entry</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-200"/>
                <div className="h-3 w-3 rounded-full bg-blue-300"/>
                <div className="h-3 w-3 rounded-full bg-blue-400"/>
              </div>
            </div>
            <div className="space-y-4 p-4">
              <h3 className="text-lg font-semibold text-blue-900">{dailyPrompt?.data}</h3>
              <Skeleton className="h-4 bg-blue-100 rounded-full w-3/4" />
              <Skeleton className="h-4 bg-blue-100 rounded-full w-full" />
              <Skeleton className="h-4 bg-blue-100 rounded-full w-2/3" />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Link href="/dashboard">
        <Button variant="outline" className="px-8 py-6  cursor-pointer font-semibold rounded-full flex items-center gap-2">
          Start Writing <ChevronRight className="h-5 w-5" />
        </Button>
          </Link>
          <Link href="#features">
        <Button variant="default" className="px-8 py-6  cursor-pointer font-semibold rounded-full flex items-center gap-2">
          Learn More <ArrowRight className="h-5 w-5" />
        </Button>
          </Link>
        </div>
      </div>

      <section id="features" className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature,index) => (
        <Card key={index} className="shadow-lg">
        <CardContent className="p-6">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <feature.icon className="h-6 w-6 text-blue-900" />
          </div>
          <h3 className="text-xl mb-2 font-semibold text-blue-900">{feature.title}</h3>
          <p className="text-sm text-gray-500">{feature.description}</p>
        </CardContent>
      </Card>
      ))}
      </section>

      <div className="space-y-24 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-900" />
            </div>
            <h3 className="text-2xl mb-2 font-semibold text-blue-900">Rich Text Editor</h3>
            <p className="text-lg text-gray-500">Express yourself with a powerful editor supporting:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"/>
                <span>Format Text with ease</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"/>
                <span>Embed Links</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"/>
                <span>Add Images and Media</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex gap-2 mb-6">
              <div className="h-8 w-8 rounded bg-blue-100" />
              <div className="h-8 w-8 rounded bg-blue-100" />
              <div className="h-8 w-8 rounded bg-blue-100" />
            </div>
            <div className="h-4 bg-blue-100 rounded-full w-3/4"/>
            <div className="h-4 bg-blue-100 rounded-full w-full"/>
            <div className="h-4 bg-blue-100 rounded-full w-2/3"/>
            <div className="h-4 bg-blue-100 rounded-full w-1/3"/>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="h-40 bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg"></div>
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-blue-100 rounded"/>
              <div className="h-4 w-16 bg-blue-100 rounded"/>
              <div className="h-4 w-16 bg-blue-100 rounded"/>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-blue-900" />
            </div>
            <h3 className="text-2xl mb-2 font-semibold text-blue-900">Mood Analytics</h3>
            <p className="text-lg text-gray-500">Track your emotional journey with detailed analytics:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"/>
                <span>Visual mood trends</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"/>
                <span>Pattern Recognition</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400"/>
                <span>
                  Sentiment Analysis
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <TestimonialCarousel />
      <Faqs />
      <Cta />
    </div>
  );
}
