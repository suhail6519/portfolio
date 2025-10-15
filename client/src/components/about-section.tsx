import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Twitter, Mail } from "lucide-react";
import type { AboutInfo } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AboutSectionProps {
  aboutInfo: AboutInfo | null;
  isLoading: boolean;
}

export function AboutSection({ aboutInfo, isLoading }: AboutSectionProps) {
  if (isLoading) {
    return (
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Skeleton className="h-64 w-64 rounded-full mx-auto" />
              <Skeleton className="h-8 w-3/4 mx-auto" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!aboutInfo) {
    return (
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-lg border border-border/50 p-12 max-w-md mx-auto">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="font-display text-2xl font-bold mb-2">About Info Not Available</h3>
            <p className="text-muted-foreground">
              Information will be added soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-cyan-magenta">About Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know me better
          </p>
          <motion.div
            className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-chart-1 to-chart-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-8">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Avatar className="h-64 w-64 border-4 border-chart-1/30 relative">
                <AvatarImage src={aboutInfo.avatarUrl || undefined} alt={aboutInfo.name} />
                <AvatarFallback className="text-6xl font-display gradient-text-cyan-purple">
                  {aboutInfo.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                {aboutInfo.githubUrl && (
                  <a
                    href={aboutInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-about-github"
                  >
                    <Button variant="outline" size="icon" className="glass">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {aboutInfo.linkedinUrl && (
                  <a
                    href={aboutInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-about-linkedin"
                  >
                    <Button variant="outline" size="icon" className="glass">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {aboutInfo.twitterUrl && (
                  <a
                    href={aboutInfo.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-about-twitter"
                  >
                    <Button variant="outline" size="icon" className="glass">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </a>
                )}
                {aboutInfo.email && (
                  <a href={`mailto:${aboutInfo.email}`} data-testid="link-about-email">
                    <Button variant="outline" size="icon" className="glass">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                )}
              </div>

              {aboutInfo.resumeUrl && (
                <a
                  href={aboutInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-download-resume"
                  className="inline-block w-full lg:w-auto"
                >
                  <Button className="w-full lg:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          {/* Bio & Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 glass border-border/50">
              <h3
                className="font-display text-3xl font-bold mb-2"
                data-testid="text-about-name"
              >
                {aboutInfo.name}
              </h3>
              <p
                className="text-xl text-chart-1 mb-6"
                data-testid="text-about-title"
              >
                {aboutInfo.title}
              </p>
              <p
                className="text-muted-foreground leading-relaxed whitespace-pre-line"
                data-testid="text-about-bio"
              >
                {aboutInfo.bio}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
