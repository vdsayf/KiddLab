library(ggplot2)
library(dplyr)
library(tidyr)
library(stringr)

theme <- theme_bw() +
  theme(plot.title = element_text(face = "bold", hjust = 0.5),
        text = element_text(size = 20),
        axis.title.x = element_text(color = "forestgreen", face = "bold"),
        axis.title.y = element_text(color = "forestgreen", face = "bold"),
        legend.title = element_text(color = "forestgreen", face = "bold"),
        panel.grid.minor.x = element_blank(),
        panel.grid.major.x = element_blank(), aspect.ratio = 1,
        axis.text.x = element_text(angle = 45, hjust = 1))

theme_set(theme)

setwd("C:/Users/Victor Dai/Documents/KiddLab")

rankings <- read.csv("data.csv", header = FALSE)
descriptions <- read.csv("base.csv", header = FALSE)

names(rankings) <- c("ID", "wholeTime", "passTest", "gender", "age", "race", "racetext", "ethnicity", "language", "languagetext", "fluenttwo",
"samp1.id", "rateAni1", "rateInv1", 
"samp2.id", "rateAni2", "rateInv2", 
"samp3.id", "rateAni3", "rateInv3", 
"samp4.id", "rateAni4", "rateInv4", 
"samp5.id", "rateAni5", "rateInv5")

rankings$ID <- as.factor(rankings$ID)
rankings$gender <- as.factor(rankings$gender)
rankings$race <- as.factor(rankings$race)
rankings$ethnicity <- as.factor(rankings$ethnicity)
rankings$language <- as.factor(rankings$language)
rankings$fluenttwo <- as.factor(rankings$fluenttwo)
rankings$samp1.id <- as.factor(rankings$samp1.id)
rankings$samp2.id <- as.factor(rankings$samp2.id)
rankings$samp3.id <- as.factor(rankings$samp3.id)
rankings$samp4.id <- as.factor(rankings$samp4.id)
rankings$samp5.id <- as.factor(rankings$samp5.id)

#names(data) <- c("ID", "Condition", "Age", "Gender", "Race", "Ethnicity", "racetext", "problem", "ladder", "language", "animalResponse", "invisibleResponse")
rankings <- rankings[!(startsWith(as.character(rankings$ID), "debug")),]
rankings <- rankings[!(startsWith(as.character(rankings$passTest), "false")),]

justRanks <- rankings[,c(12:26)] #gets just rankings 


setOne <- justRanks[,c(1:3)] #splits into sets
setTwo <- justRanks[,c(4:6)]
setThree <- justRanks[,c(7:9)]
setFour <- justRanks[,c(10:12)]
setFive <- justRanks[,c(13:15)]
names(setOne) <- c("ID","aniScore", "invScore") #renames individual set columns to same names for rbind
names(setTwo) <- c("ID","aniScore", "invScore")
names(setThree) <- c("ID","aniScore", "invScore")
names(setFour) <- c("ID","aniScore", "invScore")
names(setFive) <- c("ID","aniScore", "invScore")

justRankFixed <- rbind(setOne,setTwo,setThree,setFour,setFive); #rbind!!!!! combines sets
fixedAnimal <- filter(justRankFixed, !grepl("None",aniScore)) #Only animal scores
fixedInvisible <- filter(justRankFixed, !grepl("None",invScore)) #only invisible scores

fixedAnimal$aniScore<- as.integer(fixedAnimal$aniScore)  #change data type to integer
fixedInvisible$invScore<- as.integer(fixedInvisible$invScore)

avgAniScore=tapply(fixedAnimal$aniScore,fixedAnimal$ID,FUN=mean) #tapply to reduce to one per ID
hist(avgAniScore)
avgInvScore=tapply(fixedInvisible$invScore,fixedInvisible$ID,FUN=mean)
hist(avgInvScore)
View(avgInvScore)

#FOLLOWING PART IS TO 
#REMAKE TO FIX For CONDITION COLUMN
fixedAnimal$invScore <- 0
fixedInvisible <- fixedInvisible[, c("ID", "invScore", "aniScore")]
fixedInvisible$aniScore <- 1
names(fixedAnimal) <- c("ID", "Score", "Condition")
names(fixedInvisible) <- c("ID", "Score", "Condition")
justRankFixed <- rbind(fixedAnimal, fixedInvisible);

#following Part is to condense DESCRIPTIONS

allCounts <- count(justRankFixed, c("ID"));
View(allCounts)


v = rep(c(1,2, 2, 2), 25)
View(v)
justCounts = as.data.frame(table(justRankFixed$ID, justRankFixed$Condition))

View(justCounts)
aniCount <- justCounts[c(1:73),c(1,3)]
invCount <- justCounts[c(74:146), c(1,3)]
names(aniCount) <- c("ID", "aniFreq")
names(invCount) <- c("ID", "invFreq")
aniCount$ID <- as.character(aniCount$ID) #set as character to trim space
invCount$ID <- as.character(invCount$ID) 

aniCount <- aniCount %>% 
  mutate(across(where(is.character), str_trim)) #trim space

invCount <- invCount %>% 
  mutate(across(where(is.character), str_trim)) #trim space


justDesc <- descriptions[,c("V1","V17","V18")]
names(justDesc) <- c("ID", "aniResp", "invResp")
justDesc$ID <- as.factor(justDesc$ID)
View(justDesc)

counts <- merge(justDesc, aniCount)
View(counts)
counts <- merge(counts, invCount)
View(counts)

#scores <- data %>% group_by(ID, Type, Gender) %>% summarise(Score = sum(Response))
#scores <- scores %>% group_by(ID, Gender) %>% spread(Type, Score)
#names(scores) <- c("ID", "Gender", "Math", "Voice")

#ggplot(data, aes(x = ladder, y = problem)) + geom_point()

#LOOK UP HOW TO USE GGPLOT
#ggplot(scores, aes(x = Voice, y = Math)) +
#geom_point()
# +geom_abline(slope = 32/156, linetype = "dotted") +
#xlim(0, 156) +``
#ylim(0, 32)



