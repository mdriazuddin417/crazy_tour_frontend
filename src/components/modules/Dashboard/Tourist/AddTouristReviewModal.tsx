/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/lib/types";
import { createReviewService } from "@/services/review/review.service";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const reviewFormSchema = z.object({
  comment: z.string().max(1000),
  rating: z.number().min(0).max(5),
});

export const AddTouristReviewModal = ({ children, bookingItem }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const parsed = reviewFormSchema.safeParse({
        comment,
        rating,
      });

      if (!parsed.success) {
        toast.error('Invalid form data');
       
        setIsLoading(false);
        return;
      }

      const payload: Review = {
        bookingId: bookingItem._id,
        guideId: bookingItem?.guideId._id,
        touristId: bookingItem?.touristId?._id,
        rating: rating,
        comment: comment,
      };

      const res = await createReviewService(payload);

      if (!res.success) {
        toast.error('Failed to add review');
      }
      toast.success("Review added successfully!");

      setIsOpen(false);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Add Review
          </DialogTitle>
          <DialogDescription>Add a review for this booking.</DialogDescription>
        </DialogHeader>

        <div>
          <label className="block text-sm font-medium">Comment</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rating</label>
          <Input
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            max={5}
          />
        </div>

        {/* SUBMIT */}
        <Button
          className="w-full mt-4"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
