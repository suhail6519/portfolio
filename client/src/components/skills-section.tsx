import { motion } from "framer-motion";
import { SkillsScene } from "@/components/3d-fallback/skills-scene";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@shared/schema";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkillsSectionProps {
  skills: Skill[];
  isLoading: boolean;
}

export function SkillsSection({ skills, isLoading }: SkillsSectionProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-24 relative bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-spectrum">Skills & Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
          <motion.div
            className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-chart-1 via-chart-2 to-chart-3 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="w-full h-[600px] rounded-lg" />
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass rounded-lg border border-border/50 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="font-display text-2xl font-bold mb-2">No Skills Listed Yet</h3>
              <p className="text-muted-foreground">
                Skills will be added soon!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="glass rounded-lg border border-border/50 overflow-hidden">
                <Suspense
                  fallback={
                    <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-chart-1/10 to-chart-2/10">
                      <div className="text-center">
                        <div className="animate-spin h-12 w-12 border-4 border-chart-1 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading 3D Scene...</p>
                      </div>
                    </div>
                  }
                >
                  <SkillsScene skills={skills} />
                </Suspense>
              </div>
            </motion.div>

            {/* Skill List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 order-1 lg:order-2"
            >
              {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  data-testid={`skill-category-${category.toLowerCase().replace(/\//g, '-')}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="text-sm font-semibold">{category}</Badge>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="glass rounded-lg p-4 border border-border/30"
                        data-testid={`skill-${skill.id}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium" data-testid={`text-skill-name-${skill.id}`}>
                            {skill.name}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`text-proficiency-${skill.id}`}>
                            {skill.proficiency}%
                          </span>
                        </div>
                        <Progress
                          value={skill.proficiency}
                          className="h-2"
                          data-testid={`progress-${skill.id}`}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
